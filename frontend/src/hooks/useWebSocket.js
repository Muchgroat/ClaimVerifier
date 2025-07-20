import { useState, useEffect, useCallback, useRef } from 'react';
import websocketClient from '../utils/websocket';

export const useWebSocket = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [verificationResults, setVerificationResults] = useState(null);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const isConnecting = useRef(false);
    const heartbeatIntervalRef = useRef(null);

    // Connect to WebSocket
    const connect = useCallback(async () => {
        if (isConnecting.current || isConnected) return;

        isConnecting.current = true;
        setError(null);

        try {
            await websocketClient.connect();
            setIsConnected(true);
        } catch (err) {
            setError('Failed to connect to WebSocket server');
            console.error('WebSocket connection error:', err);
        } finally {
            isConnecting.current = false;
        }
    }, [isConnected]);

    // Disconnect from WebSocket
    const disconnect = useCallback(() => {
        websocketClient.disconnect();
        setIsConnected(false);
        setVerificationStatus(null);
        setVerificationResults(null);
        setProgress(0);
    }, []);

    // Reset verification status
    const resetVerificationStatus = useCallback(() => {
        setVerificationStatus(null);
        setVerificationResults(null);
        setProgress(0);
    }, []);

    // Send ping
    const ping = useCallback(() => {
        if (isConnected) {
            websocketClient.ping();
        }
    }, [isConnected]);

    // Setup WebSocket event handlers
    useEffect(() => {
        // Reset the WebSocket client on mount (for page refreshes)
        websocketClient.reset();

        // Connection handlers
        const handleConnect = () => {
            console.log('WebSocket connected in hook');
            setIsConnected(true);
            setError(null);
        };

        const handleDisconnect = () => {
            console.log('WebSocket disconnected in hook');
            setIsConnected(false);
        };

        // Message handlers
        const handleVerificationStarted = () => {
            setVerificationStatus('started');
            setProgress(10);
        };

        const handleStatusUpdate = (data) => {
            setVerificationStatus('processing');
            setProgress(data.progress || 50);
        };

        const handleVerificationComplete = () => {
            setVerificationStatus('completed');
            setProgress(100);
        };

        const handleError = (data) => {
            setError(data.message);
            setVerificationStatus('error');
            setProgress(0);
        };

        const handleConnection = (data) => {
            console.log('Connection message:', data.message);
        };

        const handlePong = (data) => {
            console.log('Pong received:', data.timestamp);
        };

        // Register handlers
        websocketClient.onConnect(handleConnect);
        websocketClient.onDisconnect(handleDisconnect);
        websocketClient.onMessage('verification_started', handleVerificationStarted);
        websocketClient.onMessage('status_update', handleStatusUpdate);
        websocketClient.onMessage('verification_complete', handleVerificationComplete);
        websocketClient.onMessage('error', handleError);
        websocketClient.onMessage('connection', handleConnection);
        websocketClient.onMessage('pong', handlePong);

        // Always try to connect on mount (for page refreshes)
        const initializeConnection = async () => {
            console.log('Initializing WebSocket connection...');
            await connect();
        };

        // Small delay to ensure everything is set up
        setTimeout(() => {
            initializeConnection();
        }, 100);

        // Set up heartbeat to keep connection alive
        heartbeatIntervalRef.current = setInterval(() => {
            if (isConnected) {
                websocketClient.ping();
            }
        }, 30000); // Send ping every 30 seconds

        // Cleanup on unmount
        return () => {
            if (heartbeatIntervalRef.current) {
                clearInterval(heartbeatIntervalRef.current);
            }
            websocketClient.offMessage('verification_started', handleVerificationStarted);
            websocketClient.offMessage('status_update', handleStatusUpdate);
            websocketClient.offMessage('verification_complete', handleVerificationComplete);
            websocketClient.offMessage('error', handleError);
            websocketClient.offMessage('connection', handleConnection);
            websocketClient.offMessage('pong', handlePong);
            disconnect();
        };
    }, []); // Remove dependencies to prevent re-registration

    return {
        // Connection state
        isConnected,
        connect,
        disconnect,

        // Verification state
        verificationStatus,
        verificationResults,
        resetVerificationStatus,

        // Progress and error
        progress,
        error,

        // Utility
        ping,

        // Connection status
        connectionStatus: websocketClient.getConnectionStatus()
    };
}; 