import TextProcessor from "../../component/TextProcessor/index";

function Home() {
  return (
    <TextProcessor
      title="Grammar Checker"
      apiget="grammar/getGrammar"
      apiType="check-grammar"
      apiSave="grammar/"
      type="grammar"
      buttonLabel="Thực hiện"
    />
  );
}

export default Home;
