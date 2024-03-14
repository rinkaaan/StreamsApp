import { Button, SpaceBetween, SplitPanel, SplitPanelProps } from "@cloudscape-design/components"
import VideoPlayer from "../../components/VideoPlayer"
import useWindowSize from "../../hooks/useWindowSize"
import { Breakpoints } from "../../common/constants"

export const splitPanelI18nStrings: SplitPanelProps.I18nStrings = {
  preferencesTitle: "Split panel preferences",
  preferencesPositionLabel: "Split panel position",
  preferencesPositionDescription: "Choose the default split panel position for the service.",
  preferencesPositionSide: "Side",
  preferencesPositionBottom: "Bottom",
  preferencesConfirm: "Confirm",
  preferencesCancel: "Cancel",
  closeButtonAriaLabel: "Close panel",
  openButtonAriaLabel: "Open panel",
  resizeHandleAriaLabel: "Resize split panel",
}

export default function CustomSplitPanel() {
  const { width } = useWindowSize()

  function scrollToCurrentTime() {
    let block: ScrollLogicalPosition = "center"

    if (width < Breakpoints.xSmall) {
      block = "start"
    }

    // scroll to element with id of current-subtitle
    const currentSubtitle = document.getElementById("current-subtitle")
    if (currentSubtitle) {
      currentSubtitle.scrollIntoView({ behavior: "instant", block })
      if (width < Breakpoints.xSmall) {
        window.scrollBy(0, -110)
      }
    }
  }

  return (
    <SplitPanel
      i18nStrings={splitPanelI18nStrings}
      header="akari"
      hidePreferencesButton
    >
      <SpaceBetween size="m" direction="vertical">
        <VideoPlayer />
        <Button
          onClick={scrollToCurrentTime}
        >
          Jump to current time
        </Button>
      </SpaceBetween>
    </SplitPanel>
  )
}
