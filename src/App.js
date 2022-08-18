import {Component, useCallback, useEffect, useMemo, useState} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const countTotal = (num) => {
    console.log('counting...');
    return num + 10;
}

// class Slider extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0
//         }
//     }
//
//     changeSlide = (i) => {
//         this.setState(({slide}) => ({
//             slide: slide + i
//         }))
//     }
//
//     toggleAutoplay = () => {
//         this.setState(({autoplay}) => ({
//             autoplay: !autoplay
//         }))
//     }
//
//     componentDidMount() {
//         document.title = `Slide ${this.state.slide}`
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         document.title = `Slide ${this.state.slide}`
//
//     }
//
//     render() {
//         return (
//             <Container>
//                 <div className="slider w-50 m-auto">
//                     <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                     <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
//                     <div className="buttons mt-3">
//                         <button
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}>-1</button>
//                         <button
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}>+1</button>
//                         <button
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}>toggle autoplay</button>
//                     </div>
//                 </div>
//             </Container>
//         )
//     }
// }


const Slider = (props) => {
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoPlay] = useState(false);

    const getSomeImages = useCallback(() => {
        console.log('fetching');
        return [
            "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
            "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
        ]
    }, []);

    function logging() {
        console.log('log');
    }

    useEffect(() => {
            // console.log('effect')
            document.title = `Slide ${slide}`;

            // window.addEventListener('click', logging);

            return () => {
                window.removeEventListener('click', logging);
            }
        }, [slide]
    )

    useEffect(() => {
        // console.log('autoplay')
    }, [autoplay])

    function changeSlide(i) {
        setSlide(slide + i);
    }

    function toggleAutoplay() {
        setAutoPlay(!autoplay);
    }

    const total = useMemo(()=>{
        return countTotal(slide);
    }, [slide]);

    const style = useMemo(()=>({
        color: slide > 4 ? 'red' : 'block'
    }), [slide]);

    useEffect(()=> {
        console.log('change styles');
    }, [style])


    return (
        <Container>
            <div className="slider w-50 m-auto">
                {/*<img className="d-block w-100"*/}
                {/*     src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"*/}
                {/*     alt="slide"/>*/}

                <Slide getSomeImages={getSomeImages}/>

                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null}</div>
                <div style={style} className="text-center mt-5">Total slides: {total}</div>
                <div className="buttons mt-3">
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay
                    </button>
                </div>
            </div>
        </Container>
    )
}


const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        setImages(getSomeImages());
    }, [getSomeImages])

    return (
        <>
            {images.map((url, i) =>
                <img className="d-block w-100"
                     key={i}
                     src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
                     alt="slide"/>
            )}
        </>
    )
}

function App() {
    const [slider, setSlider] = useState(true);


    return (
        <>
            <button onClick={() => setSlider(false)}>
                Click
            </button>
            {slider ? <Slider/> : null}

        </>
    );
}

export default App;
