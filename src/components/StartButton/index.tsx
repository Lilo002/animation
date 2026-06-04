import './index.css';
type Props = {
    disabled: boolean;
    timeLeft: number;
    onClick: () => void;
};

export const StartButton = ({ disabled, timeLeft, onClick }: Props) => {
    return (
        <button disabled={disabled} onClick={onClick} className="button">
            {disabled ? timeLeft : 'START'}
        </button>
    );
};
