

const chatMessageRegex = ( chatMessage: string ) => {
    // 공백만 있는 문자열을 제외한 모든 문자열을 허용
    // 줄바꿈을 포함한 공백도 고려
    const regex = /^(?!\s*$)/s;
    return regex.test(chatMessage);
}



export { chatMessageRegex }; 