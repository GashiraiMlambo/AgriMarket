'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
  sellerName: string;
  sellerAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    sellerName: 'Green Acres Farm',
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenAcres',
    lastMessage: 'Your order is ready for pickup',
    timestamp: '2 hours ago',
    unread: true,
    messages: [
      { id: '1', sender: 'seller', content: 'Hi! Do you have any questions about the pork?', timestamp: '10:30 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenAcres' },
      { id: '2', sender: 'buyer', content: 'Yes, is it grass-fed?', timestamp: '10:45 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=buyer1' },
      { id: '3', sender: 'seller', content: 'Yes, all our pork is from grass-fed animals', timestamp: '11:00 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenAcres' },
      { id: '4', sender: 'buyer', content: 'Great! Can I place an order?', timestamp: '11:15 AM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=buyer1' },
      { id: '5', sender: 'seller', content: 'Your order is ready for pickup', timestamp: '2 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GreenAcres' },
    ],
  },
  {
    id: '2',
    sellerName: 'Fresh Vegetables Co',
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FreshVeg',
    lastMessage: 'Thank you for your purchase!',
    timestamp: '1 day ago',
    unread: false,
    messages: [
      { id: '1', sender: 'seller', content: 'Thank you for your purchase!', timestamp: 'Yesterday', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FreshVeg' },
    ],
  },
  {
    id: '3',
    sellerName: 'Local Grains Store',
    sellerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LocalGrains',
    lastMessage: 'We have new stock available',
    timestamp: '3 days ago',
    unread: false,
    messages: [
      { id: '1', sender: 'seller', content: 'We have new stock available', timestamp: '3 days ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LocalGrains' },
    ],
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(mockConversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState(selectedConversation.messages);

  const filteredConversations = mockConversations.filter((conv) =>
    conv.sellerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: String(messages.length + 1),
      sender: 'buyer',
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=buyer1',
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
            <p className="text-sm text-muted-foreground">Chat with sellers</p>
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
                      src={conv.sellerAvatar}
                      alt={conv.sellerName}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1 truncate">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{conv.sellerName}</p>
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
              src={selectedConversation.sellerAvatar}
              alt={selectedConversation.sellerName}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <h2 className="font-semibold">{selectedConversation.sellerName}</h2>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 sm:p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'seller' && (
                    <img
                      src={message.avatar}
                      alt="Seller"
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                      message.sender === 'buyer'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="mt-1 text-xs opacity-70">{message.timestamp}</p>
                  </div>
                  {message.sender === 'buyer' && (
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
