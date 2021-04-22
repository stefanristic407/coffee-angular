export enum ChatMessageType {
    auth = 'auth', // Authenicate user
    threads = 'threads', // Get Thread Listing
    thread = 'thread', // Get Thread Details
    history = 'history', // Get Thread History
    message = 'message', // Send New Message
    read = 'read', // Inform the server the last read message id
    create = 'create', // Create Thread
    add = 'add', // Add Members to Thread
    update = 'update', // Update a message
    unread = 'unread', // Get unread  message count
    block = 'block', // Block a user
    unblock = 'unblock', // UnBlock a user
    blocklist = 'blocklist', // Get Block List
    users = 'users', // Get Multiple users details
    getCreate = 'get-create',
    clearChat = 'clear-chat',
    deleteChat = 'delete-chat',
}
