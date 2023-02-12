import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetDetailEvent } from "../api/events";
import useLoading from "../hooks/useLoading";
import Loader from "./Loader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const DetailEvent = () => {
  const { loading, setLoading } = useLoading();
  const { eventId } = useParams();
  const [event, setEvent] = useState();

  useEffect(() => {
    setLoading(true);
    GetDetailEvent(eventId)
      .then((res) => {
        setEvent(res);
        setLoading(false);
      })
      .catch((e) => console.log("error fetching details of event ", e));
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {event?.title}
      </ReactMarkdown>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {event?.event_type}
      </ReactMarkdown>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {event?.target_year}
      </ReactMarkdown>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {event?.start_time}
      </ReactMarkdown>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {event?.end_time}
      </ReactMarkdown>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {event?.duration}
      </ReactMarkdown>
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {event?.venue}
      </ReactMarkdown>
    </div>
  );
};

export default DetailEvent;
