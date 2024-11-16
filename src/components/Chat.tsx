import React from 'react'
import { useChat } from '@/hooks/useChat'
import { Card } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import Welcome from './Welcome'


const Chat: React.FC = () => {
    const { messages, isLoading, sendMessage } = useChat()
    return (

        <>
            {messages.length === 0 && <Welcome />}
            <Card className='mt-4 flex flex-col h-[calc(100vh-5rem)]'>
                <ScrollArea>
                    <div className="space-y-4 p-4">
                        {messages.map((message) => (
                            <ChatMessage key={message.id} message={message} />
                        ))}
                        {isLoading && (

                            <Card className='max-w-[80%] p-4 bg-muted'>
                                <p>
                                    Thinking...
                                </p>
                            </Card>
                        )}
                    </div>
                </ScrollArea>
                <ChatInput onSend={sendMessage} isLoading={isLoading} />
            </Card>
        </>
    )
}

export default Chat