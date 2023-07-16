import Title from "../components/Title";

function About() {
    return ( <>
        <div className="container p-1 p-sm-3">
            <div className="row">
                <div className="col-12">
                    <Title mainText={"Come hear a little about us"} />
                    <br />
                    <p>RSS is a company whose main purpose is to help businesses get published and get a platform.</p>
                    <p>In our company we believe that every business can advertise itself and manage its own advertising page easily and conveniently,</p>
                    <p> and at the same time consumers can also enjoy for free a variety of businesses and scraps without the need for great effort and without the need to pay money</p>
                </div>
            </div>
        </div>
        </>
     );
}

export default About;