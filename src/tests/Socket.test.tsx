test('connects to WebSocket server', (done) => {
    const newWs = new WebSocket(process.env.REACT_APP_CHAT_WEBSOCKET);
    newWs.onopen = () => {
        console.log('Connected');
        newWs.close();
        done();
    };

    newWs.onerror = () => {
        done.fail('Error');
    };
});
