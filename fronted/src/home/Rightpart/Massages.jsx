import React, { useEffect, useRef } from "react";
import Massage from "./Massage";
import usegetMassage from "../../context/usegetMassage.jsx"
import Loading from "../../Components/Loading.jsx"
import useGetSocketMessage from "../../context/useGetSocketMessage.jsx";
function Massages() {
  const { loading, messages } = usegetMassage();
  // lisneting incoming massage using this function
  useGetSocketMessage(); 
  console.log(messages);

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);
  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMsgRef}>
            <Massage message={message} />
          </div>
        ))
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Massages;