import { faChevronLeft, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'components/primitives'
import { FC } from 'react'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const FilterButton: FC<Props> = ({ open, setOpen }) => {
  return (
    <Button
      css={{
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        border: '1px solid var(--Materials-Steel, #EBEBFC)',
        background:
          'var(--Materials-Vanadium, linear-gradient(0deg, #2F2F32 0%, #161617 100%))',
      }}
      type="button"
      onClick={() => setOpen(!open)}
      size="small"
      color="gray3"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
      >
        <g clipPath="url(#clip0_860_8119)">
          <path
            d="M9.33691 4.05326L12.0036 1.3866L14.6702 4.05326"
            stroke="white"
          />
          <path d="M12.0035 8.71993V1.3866" stroke="white" />
          <path d="M12.6702 14.72H1.33691" stroke="white" />
          <path d="M12.6702 11.3866H1.33691" stroke="white" />
          <path d="M8.00358 8.05328H1.33691" stroke="white" />
        </g>
        <defs>
          <clipPath id="clip0_860_8119">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(0.00354004 0.0532837)"
            />
          </clipPath>
        </defs>
      </svg>
    </Button>
  )
}
