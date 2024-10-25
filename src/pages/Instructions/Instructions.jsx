import './Instructions.css';
import Accordion from '../../Components/Accordion/Accordion'


function Instructions() {
    const data = [
        { instruction: "Instrucción 1", explanation: "Explicación 1" },
        { instruction: "Instrucción 2", explanation: "Explicación 2" },
        { instruction: "Instrucción 3", explanation: "Explicación 3" },
        { instruction: "Instrucción 4", explanation: "Explicación 4" },
        { instruction: "Instrucción 5", explanation: "Explicación 5" },
    ];
    return (
        <div className='content'>
            <div className='header-container'>
                <p className='title'>blablablablabla blbhhiucs hn hcwdbijn dcbiun</p>
                <p className='text'>decfedve ercfhdviudjne vkbriuefv fvbuihnhb fbufehbhbfyeb bbiurwebfvyb hrbbhufbrh bjvbeihfb jfkjf  n  kdjv c n decfedve ercfhdviudjne vkbriuefv fvbuihnhb fbufehbhbfyeb bbiurwebfvyb hrbbhufbrh bjvbeihfb jfkjf  n  kdjv c n</p>
            </div>
            <div className='content-container'>
                {data.map((item, index) => (
                    <Accordion
                        key={index} 
                        title={item.instruction}
                        content={item.explanation}
                    />
                ))}
            </div>
        </div>
    );
}

export default Instructions;
