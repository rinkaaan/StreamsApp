import { Box, ContentLayout, Header, SpaceBetween, Table } from "@cloudscape-design/components"
import subtitles from "../../assets/akari.json"
import { formatSeconds, isCurrentSubtitle, Subtitle } from "../../common/typedUtils"
import { playerActions, playerSelector } from "./playerSlice"
import { useSelector } from "react-redux"
import React from "react"
import "./style.css"
import { appDispatch } from "../../common/store"

export function Component() {
  // const [currentTime, setCurrentTime] = useState(0)
  const { currentTime } = useSelector(playerSelector)
  const subs = subtitles as Subtitle[]

  function jumpToTime(time: number) {
    appDispatch(playerActions.updateSlice({ newTime: time }))
  }

  return (
    <ContentLayout
      header={
        <Header variant="h1">Subtitle Test</Header>
      }
    >
      {/*<SpaceBetween size="l">*/}
      {/*  <Container header={<Header variant="h2">A Video</Header>}>*/}
      {/*    <TextContent>Current Time: {currentTime}</TextContent>*/}
      {/*    <TextContent>{findSubtitle(subtitles, currentTime)?.text}</TextContent>*/}
      {/*  </Container>*/}
      {/*</SpaceBetween>*/}
      <Table
        // stickyHeader
        columnDefinitions={[
          {
            header: "Time",
            // cell: item => formatSeconds(item.start),
            cell: item => (
              <div className="timestamp" onClick={() => jumpToTime(item.start)}>
                {formatSeconds(item.start)}
              </div>
            )
          },
          {
            header: "Subtitle",
            cell: item => (
              <div
                className="result"
                id={isCurrentSubtitle(item, currentTime) ? "current-subtitle" : undefined}
              >
                <div>{item.text}</div>
                {/*<div className="translation">{item.translation}</div>*/}
              </div>
            ),
            width: "100%",
          },
        ]}
        items={subs}
        loadingText="Loading resources"
        sortingDisabled
        empty={
          <Box
            margin={{ vertical: "xs" }}
            textAlign="center"
            color="inherit"
          >
            <SpaceBetween size="m">
              <b>No words spoken yet</b>
              {/*<Button>Click to begin transcribing</Button>*/}
            </SpaceBetween>
          </Box>
        }
      />
    </ContentLayout>
  )
}
