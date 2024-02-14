import { Alert, Box, Button, FormField, Input, Modal, SpaceBetween } from "@cloudscape-design/components"
import { useSelector } from "react-redux"
import store, { appDispatch } from "../../../common/store"
import { FormEvent, useEffect } from "react"
import { addStreams, mediaActions, mediaSelector } from "../mediaSlice"

export default function NewStreamsModal() {
  const { errorMessages, newStreamsUrl, asyncStatus, newStreamsModalOpen } = useSelector(mediaSelector)
  const loading = asyncStatus["addStreams"] === "pending"

  useEffect(() => {
    if (asyncStatus["addStreams"] === "fulfilled") {
      onClose()
    }
  }, [asyncStatus["addStreams"]])

  function onClose() {
    appDispatch(mediaActions.clearErrorMessages())
    appDispatch(mediaActions.resetNewStreamsState())
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    await onCreate()
  }

  async function onCreate() {
    if (!validate()) return
    await appDispatch(addStreams())
  }

  function validate() {
    const { newStreamsUrl } = store.getState().media
    if (newStreamsUrl.trim().length === 0) {
      appDispatch(mediaActions.addMissingErrorMessage("newStreamsUrl"))
      return false
    }
    return true
  }

  return (
    <Modal
      visible={newStreamsModalOpen}
      header="New Streams"
      closeAriaLabel="Close modal"
      onDismiss={onClose}
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button
              variant="link"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={onCreate}
              loading={loading}
            >
              Create
            </Button>
          </SpaceBetween>
        </Box>
      }
    >
      <SpaceBetween size="m">
        <form onSubmit={onSubmit}>
          <input
            hidden
            type="submit"
          />
          <FormField
            label="Streams URL"
            errorText={errorMessages["newStreamsUrl"]}
          >
            <Input
              value={newStreamsUrl}
              placeholder="Enter value"
              onChange={event => {
                appDispatch(mediaActions.clearErrorMessages())
                appDispatch(mediaActions.updateSlice({ newStreamsUrl: event.detail.value }))
              }}
            />
          </FormField>
        </form>
        {errorMessages["newStreams"] && (
          <Alert type="error">
            {errorMessages["newStreams"]}
          </Alert>
        )}
      </SpaceBetween>
    </Modal>
  )
}
