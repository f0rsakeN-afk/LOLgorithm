import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

const Welcome: React.FC = () => {
    return (
        <Card className='mt-4'>
            <CardHeader>
                <CardTitle>Welcome to LOLgorithm Chat</CardTitle>
                <CardDescription>
                    This is a chat interface powered by Google's Gemini AI. You can ask
                    questions, get explanations, or just have a conversation.
                </CardDescription>
            </CardHeader>
        </Card>
    )
}

export default Welcome