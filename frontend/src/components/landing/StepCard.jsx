const StepCard = ({icon: Icon, title, description, stepNumber})=>{
    return(
        <div className="step-card">
            <Icon className="step-icon" />
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="step-number">
                {stepNumber}
            </div>
        </div>
    );
};
export default StepCard;