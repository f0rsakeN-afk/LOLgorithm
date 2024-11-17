import React from 'react'
import { cn } from '@/lib/utils'
import { Card } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Message } from '@/types';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import s1 from '../assets/s1.png'

interface chatMessageProps {
    message: Message
}

const ChatMessage: React.FC<chatMessageProps> = ({ message }) => {
    const isUser: boolean = message?.role === 'user';
    return (
        <div className={cn('flex items-center ', isUser ? 'justify-end gap-1' : 'justify-start')}>
            <Card className={cn('max-w-[80%] p-4', isUser ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                <p className="whitespace-pre-wrap">
                    {message.content}
                </p>

                {isUser ? null : <Button variant='outline' size='icon'>
                    <Copy className='h-4 w-4' />
                </Button>}
            </Card>
            {isUser ? <Avatar>
                <AvatarImage src={s1} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
                : null}
        </div>
    )
}

export default ChatMessage;