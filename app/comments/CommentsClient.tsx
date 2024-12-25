"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { MessageCircle, ThumbsUp, Heart, Star, Smile } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ReactionType = 'like' | 'love' | 'star' | 'smile';

interface Reaction {
  type: ReactionType;
  count: number;
  users: string[];
}

interface Reply {
  id: number;
  comment_id: number;
  created_at: string;
  name: string;
  content: string;
  reactions: Record<ReactionType, Reaction>;
}

interface Comment {
  id: number;
  created_at: string;
  name: string;
  content: string;
  reactions: Record<ReactionType, Reaction>;
  replies?: Reply[];
}

type ReactionIconsType = {
  [K in ReactionType]: JSX.Element;
};

type ReactionColorsType = {
  [K in ReactionType]: string;
};

const reactionIcons: ReactionIconsType = {
  like: <ThumbsUp className="w-4 h-4" />,
  love: <Heart className="w-4 h-4" />,
  star: <Star className="w-4 h-4" />,
  smile: <Smile className="w-4 h-4" />
};

const reactionColors: ReactionColorsType = {
  like: "text-blue-500",
  love: "text-red-500",
  star: "text-yellow-500",
  smile: "text-green-500"
};

const defaultReactions: Record<ReactionType, Reaction> = {
  like: { type: 'like', count: 0, users: [] },
  love: { type: 'love', count: 0, users: [] },
  star: { type: 'star', count: 0, users: [] },
  smile: { type: 'smile', count: 0, users: [] }
};

export default function CommentsClient({ initialComments }: { initialComments: Comment[] }) {
  const formId = useId();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createClient();

  async function handleReaction(commentId: number, reactionType: ReactionType, isReply = false) {
    if (!name) {
      toast.error('Please enter your name first');
      return;
    }

    try {
      const table = isReply ? 'replies' : 'comments';
      const targetComment = isReply 
        ? comments.find(c => c.replies?.some(r => r.id === commentId))?.replies?.find(r => r.id === commentId)
        : comments.find(c => c.id === commentId);

      if (!targetComment) return;

      const currentReactions = targetComment.reactions || {};
      const reaction = currentReactions[reactionType] || { type: reactionType, count: 0, users: [] };
      const hasReacted = reaction.users.includes(name);

      const updatedReaction = {
        ...reaction,
        count: hasReacted ? reaction.count - 1 : reaction.count + 1,
        users: hasReacted 
          ? reaction.users.filter(u => u !== name)
          : [...reaction.users, name]
      };

      const { error } = await supabase
        .from(table)
        .update({
          reactions: {
            ...currentReactions,
            [reactionType]: updatedReaction
          }
        })
        .eq('id', commentId);

      if (error) throw error;

      setComments(comments.map(comment => {
        if (isReply && comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => 
              reply.id === commentId 
                ? { ...reply, reactions: { ...currentReactions, [reactionType]: updatedReaction } }
                : reply
            )
          };
        }
        return comment.id === commentId 
          ? { ...comment, reactions: { ...currentReactions, [reactionType]: updatedReaction } }
          : comment;
      }));

      toast.success(hasReacted ? 'Reaction removed!' : 'Reaction added!');
    } catch (error) {
      toast.error('Failed to update reaction');
      console.error('Reaction error:', error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim() || !name.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            name: name.trim(),
            content: newComment.trim(),
            reactions: defaultReactions
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setComments([data, ...comments]);
      setNewComment("");
      toast.success('Komentar berhasil dikirim!');
    } catch (error) {
      toast.error('Gagal mengirim komentar');
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleReply(commentId: number) {
    if (!replyContent.trim() || !name.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('replies')
        .insert([
          {
            comment_id: commentId,
            name: name.trim(),
            content: replyContent.trim(),
            reactions: defaultReactions
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), data]
          };
        }
        return comment;
      }));

      setReplyContent("");
      setReplyTo(null);
      toast.success('Balasan berhasil dikirim!');
    } catch (error) {
      toast.error('Gagal mengirim balasan');
      console.error('Reply error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function ReactionButtons({ item, isReply = false }: { item: Comment | Reply, isReply: boolean }) {
    return (
      <div className="flex space-x-2 mt-2">
        {Object.entries(reactionIcons).map(([type, icon]) => {
          const reactionType = type as ReactionType;
          return (
            <TooltipProvider key={type}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-2 ${item.reactions?.[reactionType]?.users.includes(name) ? reactionColors[reactionType] : ''}`}
                    onClick={() => handleReaction(item.id, reactionType, isReply)}
                  >
                    {icon}
                    {item.reactions?.[reactionType]?.count > 0 && (
                      <span className="ml-1 text-xs">
                        {item.reactions[reactionType].count}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Give Feedback
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 mb-8 backdrop-blur-sm bg-white/5">
            <form id={formId} onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={isSubmitting}
              />
              <Textarea
                placeholder="Tulis komentar Anda..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] bg-white/5"
                required
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}
              </Button>
            </form>
          </Card>
        </motion.div>

        <div className="space-y-4">
          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 backdrop-blur-sm bg-white/5">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarFallback>{comment.name[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{comment.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="mt-2 text-muted-foreground">{comment.content}</p>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Balas
                    </Button>

                    {replyTo === comment.id && (
                      <div className="mt-4 pl-4 border-l-2 border-primary/30">
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Nama Anda"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                            disabled={isSubmitting}
                          />
                          <Textarea
                            placeholder="Tulis balasan Anda..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="min-h-[80px] bg-white/5"
                            required
                            disabled={isSubmitting}
                          />
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleReply(comment.id)}
                              disabled={isSubmitting}
                              size="sm"
                            >
                              {isSubmitting ? 'Mengirim...' : 'Kirim Balasan'}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setReplyTo(null)}
                            >
                              Batal
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    <ReactionButtons item={comment} isReply={false} />

                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 pl-4 space-y-4 border-l-2 border-primary/30">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarFallback>{reply.name[0]?.toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className="font-semibold">{reply.name}</h4>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(reply.created_at).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                              <p className="mt-2 text-muted-foreground">{reply.content}</p>
                              <ReactionButtons item={reply} isReply={true} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}