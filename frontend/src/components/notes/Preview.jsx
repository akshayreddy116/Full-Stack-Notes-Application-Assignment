import ReactMarkdown from "react-markdown";
import "./Preview.css";
export default function Preview({ content }) {
  return (
    <div className="preview">
      <ReactMarkdown>{content || ""}</ReactMarkdown>
    </div>
  );
}