import React, { FC, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Modal from 'react-modal'
import { Box, Button, Input, Textarea, Flex, Text } from 'components/primitives'

const customStyles = {
  content: {
    inset: '80px 15px',
    padding: '0',
    margin: '0 auto',
    maxWidth: '700px',
    backgroundColor: 'black',
    height: 'fit-content',
  },
}

const thumbsContainer: React.CSSProperties = {
  border: '1px solid $gray4',
  cursor: 'pointer',
  backgroundColor: 'black',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  textAlign: 'center',
  alignItems: 'center',
  gap: 10,
  minHeight: 100,
}

const thumb: React.CSSProperties = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
}

const thumbInner: React.CSSProperties = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}

const img: React.CSSProperties = {
  display: 'block',
  width: 'auto',
  height: '100%',
}

Modal.setAppElement('#__next')

interface FileWithPreview extends File {
  preview: string
}

type Props = {
  isShow: boolean
  toggle(): void
  profile: any
}

export const EditProfileModal: FC<Props> = ({ profile, isShow, toggle }) => {
  const [name, setName] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [twitter, setTwitter] = useState<string>('')
  const [bannerFiles, setBannerFiles] = useState<FileWithPreview[]>([])
  const [profileFiles, setProfileFiles] = useState<FileWithPreview[]>([])

  useEffect(() => {
    let body = document.body
    if (isShow) {
      body.style.overflowY = 'hidden'
    } else {
      body.style.overflowY = 'scroll'
    }
  }, [isShow])

  const {
    getRootProps: bannerGetRootProps,
    getInputProps: bannerGetInputProps,
  } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    onDrop: (acceptedFiles: File[]) => {
      setBannerFiles(
        acceptedFiles.map(
          (file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }) as FileWithPreview
        )
      )
    },
  })

  const {
    getRootProps: profileGetRootProps,
    getInputProps: profileGetInputProps,
  } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    onDrop: (acceptedFiles: File[]) => {
      setProfileFiles(
        acceptedFiles.map(
          (file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }) as FileWithPreview
        )
      )
    },
  })

  return (
    <Modal
      isOpen={isShow}
      style={customStyles}
      onRequestClose={toggle}
      shouldCloseOnOverlayClick={true}
    >
      <Flex
        css={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #DECAAB',
        }}
      >
        <Flex
          css={{
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            padding: '20px 24px',
          }}
        >
          <Text style="h4">Create Profile</Text>
          <Button
            css={{ fontSize: '12px', padding: '7px 12px ', minHeight: 25 }}
            onClick={toggle}
          >
            X
          </Button>
        </Flex>
      </Flex>
      <Flex css={{ flexDirection: 'column', p: '$6', pt: '$5', gap: 20 }}>
        <Box css={{ display: 'grid', gap: 20 }}>
          <Text>Name</Text>
          <Input
            type="tex"
            value={name? name : profile.displayName}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box css={{ display: 'grid', gap: 20 }}>
          <Text>Bio</Text>
          <Textarea
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Box>
        <Box css={{ display: 'grid', gap: 20 }}>
          <Text>Twitter</Text>
          <Input
            type="tex"
            value={twitter? twitter: profile.twitterHandle}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </Box>
        <Box css={{ display: 'grid', gap: 20 }}>
          <Text>Upload Profile Pic</Text>
          {profileFiles.length == 0 ? (
            <Box
              css={{ ...thumbsContainer }}
              {...profileGetRootProps({ className: 'dropzone' })}
            >
              <Input {...bannerGetInputProps()} />
              <Text>
                Drag a file here to upload, or
                <br />
                <span style={{ textDecoration: 'underline' }}>
                  click here to browse
                </span>
              </Text>
            </Box>
          ) : (
            <aside
              style={{
                border: '1px solid $gray4',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                textAlign: 'center',
                alignItems: 'center',
                gap: 10,
              }}
              {...profileGetRootProps({ className: 'dropzone' })}
            >
              <Box style={thumb} key={profileFiles[0].name}>
                <Box style={thumbInner}>
                  <img
                    src={profileFiles[0].preview}
                    style={img}
                    onLoad={() => {
                      URL.revokeObjectURL(profileFiles[0].preview)
                    }}
                    alt={profileFiles[0].name}
                  />
                </Box>
              </Box>
              <Text>Profile Pic</Text>
            </aside>
          )}
        </Box>
        <Box css={{ display: 'grid', gap: 20 }}>
          <Text>Upload Banner</Text>
          {bannerFiles.length == 0 ? (
            <Box
              css={{ ...thumbsContainer }}
              {...bannerGetRootProps({ className: 'dropzone' })}
            >
              <Input {...bannerGetInputProps()} />
              <Text>
                Drag a file here to upload, or
                <br />
                <span style={{ textDecoration: 'underline' }}>
                  click here to browse
                </span>
              </Text>
            </Box>
          ) : (
            <aside
              style={{
                border: '1px solid $gray4',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                textAlign: 'center',
                alignItems: 'center',
                gap: 10,
              }}
              {...bannerGetRootProps({ className: 'dropzone' })}
            >
              <Box style={thumb} key={bannerFiles[0].name}>
                <Box style={thumbInner}>
                  <img
                    src={bannerFiles[0].preview}
                    style={img}
                    onLoad={() => {
                      URL.revokeObjectURL(bannerFiles[0].preview)
                    }}
                    alt={bannerFiles[0].name}
                  />
                </Box>
              </Box>
              <Text>Profile Banner</Text>
            </aside>
          )}
        </Box>
        <Button css={{ display: 'flex', justifyContent: 'center' }} disabled>
          Create Profile
        </Button>
      </Flex>
    </Modal>
  )
}

export default EditProfileModal
