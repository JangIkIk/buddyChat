import { useEffect, useState } from "react";

const useKeywordInfo = () => {
  const [keyword, setKeyword] = useState<KeywordItem | null>(null);
  useEffect(()=>{
    const _tempRoomInfo = setTimeout(()=>{
        setKeyword({
            id: 1,
            createTime: new Date(),
            joinTime: new Date(),
            currentUser: 3,
            userList: ["피카츄", "파이리", "꼬북이"],
            type: "keyword",
          })
    },2000)

    return () => {
        clearTimeout(_tempRoomInfo);
    }
  },[])

  return keyword;
};

type KeywordItem = {
    id: number;
    createTime: Date;
    joinTime: Date;
    currentUser: number;
    userList: string[];
    type: "keyword";
} & {};

export { useKeywordInfo, type KeywordItem };
