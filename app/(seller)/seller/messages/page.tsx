'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Send, Paperclip } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  sender: 'buyer' | 'seller';
  content: string;
  timestamp: string;
  avatar: string;
}

interface Conversation {
  id: string;
  buyerName: string;
  buyerAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    buyerName: 'John Muleya',
    buyerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnM',
    lastMessage: 'Great, I will place an order tomorrow',
    timestamp: '2 hours ago',
    unread: true,
    messages: [
      { id: '1', sender: 'buyer', content: 'Hi! Do you have pork chops available?', timestamp: '10:30 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnM' },
      { id: '2', sender: 'seller', content: 'Yes, we have fresh pork chops available', timestamp: '10:45 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenAcres' },
      { id: '3', sender: 'buyer', content: 'What is the price?', timestamp: '11:00 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnM' },
      { id: '4', sender: 'seller', content: 'ZWL 450 per kg, minimum order 2kg', timestamp: '11:15 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenAcres' },
      { id: '5', sender: 'buyer', content: 'Great, I will place an order tomorrow', timestamp: '2 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnM' },
    ],
  },
  {
    id: '2',
    buyerName: 'Sarah Mutende',
    buyerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahM',
    lastMessage: 'Thank you for the quick delivery',
    timestamp: '1 day ago',
    unread: false,
    messages: [
      { id: '1', sender: 'buyer', content: 'Thank you for the quick delivery', timestamp: 'Yesterday', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahM' },
    ],
  },
  {
    id: '3',
    buyerName: 'Zungurai Mwale',
    buyerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZunguM',
    lastMessage: 'Do you deliver to Harare?',
    timestamp: '3 days ago',
    unread: false,
    messages: [
      { id: '1', sender: 'buyer', content: 'Do you deliver to Harare?', timestamp: '3 days ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZunguM' },
    ],
  },
];

export default function SellerMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(mockConversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState(selectedConversation.messages);

  const filteredConversations = mockConversations.filter((conv) =>
    conv.buyerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: String(messages.length + 1),
      sender: 'seller',
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenAcres',
    };

    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    setMessages(conv.messages);
  };

  return (
    <div className="h-screen overflow-hidden p-4 sm:p-6 lg:p-8">
      <div className="flex h-full flex-col gap-4 lg:flex-row">
        {/* Conversations List */}
        <div className="hidden flex-shrink-0 flex-col gap-4 lg:flex lg:w-80">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Messages</h1>
            <p className="text-sm text-muted-foreground">Chat with buyers</p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Conversations */}
          <ScrollArea className="flex-1">
            <div className="space-y-2 pr-4">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  className={`w-full rounded-lg p-3 text-left transition-colors ${
                    selectedConversation.id === conv.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={conv.buyerAvatar}
                      alt={conv.buyerName}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1 truncate">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{conv.buyerName}</p>
                        {conv.unread && (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="truncate text-sm text-muted-foreground">
                        {conv.lastMessage}
                      </p>
                      <p className="text-xs text-muted-foreground">{conv.timestamp}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-lg border bg-card">
          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b p-4 sm:p-6">
            <img
              src={selectedConversation.buyerAvatar}
              alt={selectedConversation.buyerName}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <h2 className="font-semibold">{selectedConversation.buyerName}</h2>
              <p className="text-xs text-muted-foreground">Active now</p>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 sm:p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'buyer' && (
                    <img
                      src={message.avatar}
                      alt="Buyer"
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                      message.sender === 'seller'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="mt-1 text-xs opacity-70">{message.timestamp}</p>
                  </div>
                  {message.sender === 'seller' && (
                    <img
                      src={message.avatar}
                      alt="You"
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4 sm:p-6">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
