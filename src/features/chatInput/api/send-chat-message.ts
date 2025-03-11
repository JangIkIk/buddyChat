const sendChatMessage = (
  socket: GlobalSocket,
  message: string,
  callback: (errorMessage: string) => void
) => {
  try {
    if (!socket && !message) return;
    socket.emit("message-send", message, (res: { status: number }) => {
      const { status } = res;
      switch (status) {
        case 200:
          callback("");
          break;
        case 400:
          callback("1글자 이상 ~ 100글자 이하 문자");
          break;
        default: // 500
          callback("서버문제로 인해 전송할수가 없습니다.");
      }
    });
  } catch {
    callback("잠시후 다시 시도해주세요");
  }
};

export { sendChatMessage };