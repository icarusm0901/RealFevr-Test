import React from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useGlobalContext } from "contexts/GlobalContext";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function Calendar() {
  const { emojiData } = useGlobalContext();

  const navigate = useNavigate();

  const renderEventContent = (eventInfo: any) => {
    return (
      <>
        {/* <b
          style={{
            marginRight: "0.53em",
          }}
        >
          {eventInfo.timeText}
        </b> */}
        {eventInfo.event.title}
      </>
    );
  };

  const onEmojiSelect = (eventInfo: any) => {
    console.log(eventInfo);
    const hash = window.btoa(encodeURIComponent(eventInfo.native));
    navigate(`/add/${hash}`);
  };

  return (
    <div className="calendar-content">
      <div className="calendar">
        <FullCalendar
          viewHeight="200"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={emojiData}
          eventContent={renderEventContent}
        />
      </div>
      <div className="emoji">
        <Picker theme="dark" data={data} onEmojiSelect={onEmojiSelect} />
      </div>
    </div>
  );
}

export default Calendar;
