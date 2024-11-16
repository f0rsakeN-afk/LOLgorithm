import React, { FormEvent, useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send } from 'lucide-react';

interface chatInputProps {
    isLoading: boolean;
    onSend: (message: string) => void
}


const ChatInput: React.FC<chatInputProps> = ({ onSend, isLoading }) => {
    const [input, setInput] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSend(input.trim())
            setInput('')
        }
    }

    return (
        <form className='flex items-center gap-2 p-4' onSubmit={handleSubmit}>
            <Input value={input} onChange={(e) => setInput(e.target.value)}
                placeholder='Type a message'
                className='flex-1'
            />
            <Button type='submit'>
                <Send className='h-4 w-4' />
            </Button>
        </form>
    )
}

export default ChatInput