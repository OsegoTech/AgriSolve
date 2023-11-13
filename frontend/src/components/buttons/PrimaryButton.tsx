interface IButtonOptions {
	children: React.ReactNode
	onClick: () => void
	variant?: 'primary' | 'outline'
	className?: string
	icon?: React.ReactNode
}

type ButtonPropsType = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> &
	IButtonOptions

const styleMap = {
	primary:
		'bg-[#5D5FEF] hover:bg-[#5D5FEF]/90 focus:ring-2 focus:ring-[#5D5FEF]/50 text-white',
	outline:
		'border-[#5D5FEF] border-2 text-[#5D5FEF] font-[500] hover:bg-[#5D5FEF] hover:text-white active:bg-white active:text-[#5D5FEF]'
}

const PrimaryButton = ({
	children,
	onClick,
	icon,
	variant = 'primary',
	className,
	...rest
}: ButtonPropsType) => {
	return (
		<button
      type="button"
			onClick={onClick}
			{...rest}
			className={`rounded-lg p-2 flex items-center space-x-1 transition-colors duration-300 ${styleMap[variant]} ${className}`}
		>
			{icon ? icon : null}

      <p>
        {children}
      </p>
		</button>
	)
}

export default PrimaryButton
