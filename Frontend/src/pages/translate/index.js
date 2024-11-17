import TextProcessor from "../../component/TextProcessor/index";

function Translate() {
  return (
    <TextProcessor
      title="Text Translate"
      apiget="translate/getTranslate"
      apiType="translate-text"
      apiSave="translate/"
      type="translate"
      buttonLabel="Dịch"
      targetLanguage= "true"
    />
  );
}

export default Translate;
