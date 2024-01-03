type AccountInfoProps = {
    header: string
    info: string
    infostyle?: string
    buttonTitle: string
    buttonColor?: string
    buttonStyle?: string
    hr?: string
    onClick?: () => void
  }
  export default function AccountInfo({
    header,
    info,
    infostyle,
    buttonTitle,
    buttonColor,
    buttonStyle,
    hr,
    onClick,
  }: AccountInfoProps) {
    return (
      <div>
        <h1 className={`text-lg pt-4 font-semibold`}>{header}</h1>
        <div className={`flex flex-row items-center justify-between`}>
          <p className={`${infostyle ?? 'text-lg'}`}>{info}</p>
          <button
            className={`${buttonColor ?? 'bg-gray-500'}  ${
              buttonStyle ?? 'px-10 py-2 mb-2 font-semibold rounded-xl'
            } flex items-center justify-center`}
            onClick={() => onclick}
          >
            {buttonTitle}
          </button>
        </div>
  
        {hr === 'bottom' ? <></> : <hr className={`md:bg-gray-300 md:h-0.5`} />}
      </div>
    )
  }
  