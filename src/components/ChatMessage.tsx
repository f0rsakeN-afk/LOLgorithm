import React from 'react'
import { cn } from '@/lib/utils'
import { Card } from './ui/card';

interface chatMessageProps {
    message: string
}

const ChatMessage: React.FC<chatMessageProps> = ({ message }) => {
    const isUser: boolean = message?.role === 'user';
    return (
        <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
            <Card className={cn('max-w-[80%] p-4', isUser ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                <p className="whitespace-pre-wrap">
                    {message.content}
                </p>
            </Card>
        </div>
    )
}

export default ChatMessage;