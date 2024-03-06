import { SplitPanel, SplitPanelProps } from "@cloudscape-design/components"
import VideoPlayer from "../../components/VideoPlayer"

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
  return (
    <SplitPanel
      i18nStrings={splitPanelI18nStrings}
      header={"tbs mar 05 14 45 04"}
      hidePreferencesButton
    >
      <VideoPlayer />
    </SplitPanel>
  )
}
