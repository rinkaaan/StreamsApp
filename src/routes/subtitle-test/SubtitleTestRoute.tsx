import { Container, ContentLayout, Header, SpaceBetween, TextContent } from "@cloudscape-design/components"
import subtitles from "./tbs mar 05 14 59 58.json"
import { findSubtitle } from "../../common/typedUtils"
import { playerSelector } from "./playerSlice"
import { useSelector } from "react-redux"

export function Component() {
  // const [currentTime, setCurrentTime] = useState(0)
  const { currentTime } = useSelector(playerSelector)

  return (
    <ContentLayout
      header={
        <Header variant="h1">Subtitle Test</Header>
      }
    >
      <SpaceBetween size="l">
        <Container header={<Header variant="h2">A Video</Header>}>
          <TextContent>Current Time: {currentTime}</TextContent>
          <TextContent>{findSubtitle(subtitles, currentTime)?.text}</TextContent>
        </Container>
      </SpaceBetween>
    </ContentLayout>
  )
}
