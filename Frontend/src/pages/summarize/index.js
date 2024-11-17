import TextProcessor from "../../component/TextProcessor/index";

function Summarize() {
  return (
    <TextProcessor
      title="Text Summarizer"
      apiget="summarize/getSummarize"
      apiType="check-grammar"
      apiSave="summarize/"
      type="summarize"
      buttonLabel="Tóm tắt"
    />
  );
}

export default Summarize;
