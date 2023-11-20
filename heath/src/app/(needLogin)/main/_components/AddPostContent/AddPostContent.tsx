import { PropsWithChildren, useRef } from 'react'
import * as S from './AddPostContent.styles'
import type { AddPostModalProps } from './AddPostContent.types'
import { useAtom } from 'jotai'
import { AddPostImageState } from '@/store/addPostModal.atoms'
import Image from 'next/image'

export const AddPostContent = ({ onClose }: PropsWithChildren<AddPostModalProps>) => {
  const [postImage, setPostImage] = useAtom(AddPostImageState)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUploadButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }
    const file = e.target.files[0]
    const imageUrl = URL.createObjectURL(file)

    setPostImage((prev) => ({ ...prev, imageUrl }))
  }

  return (
    <div>
      <S.AddPostHead>
        <S.AddPostTitle>새글 쓰기</S.AddPostTitle>
        <div>
          <S.CancelButton onClick={onClose}>취소</S.CancelButton>
          <S.SubmitButton>등록</S.SubmitButton>
        </div>
      </S.AddPostHead>
      <S.TitleInput placeholder="제목을 입력해주세요" />
      <S.ContentTextarea placeholder="내용을 입력해주세요" />
      <S.ImageSection>
        <input type="file" accept="image/*" ref={inputRef} style={{ display: 'none' }} onChange={handleUploadImage} />
        <S.AddImageIcon onClick={handleUploadButtonClick} />
        {postImage.imageUrl && (
          <S.ImageBox>
            <Image style={{ objectFit: 'contain' }} src={postImage.imageUrl} alt="postImage" fill />
          </S.ImageBox>
        )}
      </S.ImageSection>
    </div>
  )
}
