import RenderPage from "../../base/utils/renderPage";
const ReusablePage = props => {
  const { pgid, help, initialProps } = props;
  return RenderPage(pgid, help, initialProps);
}
export default ReusablePage;
