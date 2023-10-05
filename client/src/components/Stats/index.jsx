import { Link } from "react-router-dom";
import { useShop } from '../../contexts/ShopContext'
import { useEffect, useState } from "react"
import { AvatarModal } from '..';
import avatarImage from '../../assets/images/testavatars/avi.png'
import { StatsModal } from '..';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Stats = () => {

	const [stats, setStats] = useState([]);

	async function fetchData(){
		const response = await fetch("http://127.0.0.1:3000/users/1/statistics")
		const data = await response.json()
		console.log(data)
		setStats(data)
	}

	useEffect(() => {
		try{
			fetchData()
		}catch(err){
			err.message
		}
	}, [])
	
	const { userDetails, openModal } = useShop()

    const showModal = () => {
        MySwal.fire({
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
          html: <AvatarModal avatarImage={avatarImage} userDetails={userDetails} />,
          showConfirmButton: false,
          width: '600px'
        }).then(() => {
          openModal();
        });
    };

	const showModalStats = () => {
        MySwal.fire({
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
          html: <StatsModal stats={stats} />,
          showConfirmButton: false,
          width: '600px'
        }).then(() => {
          openModal();
        });
    };

	return (
		<div className="flex-container-stat">
			<div className="icontainer2">
				<div className="irectangle-1">
					<div className="itext-wrapper-6">My coins</div>
					<div className="irectangle-2">
						<img
						className="img"
						alt="Image"
						src="/src/assets/images/testitem/coin.png"
						/>
						<div className="itext-wrapper-7">950</div>
					</div>
				</div>
			</div>
			<div className="icontainer3">
				<div className="irectangle-3">
					<div className="itext-wrapper-9"> My Inventory</div>
					<div className="irectangle-4">
						<button className="pro-button" onClick={showModal}>Open</button>
					</div>
				</div>
			</div>
			<div className="icontainer4">
				<div className="irectangle-3">
					<div className="itext-wrapper-9">Shop</div>
					<div className="irectangle-4">
						<Link to="/shop">
							<button className="pro-button">Enter here</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="icontainer5">
					<div className="irectangle-5">
						<div className="itext-wrapper-11">My Stats</div>
						<div className="irectangle-6">
						<button className="pro-button" onClick={showModalStats}>Open</button>
						</div>
				</div>
			</div>
			{/* <img
					className="bg-image"
					alt="Rectangle"
					src="/src/assets/images/testbg/rainbow.jpg"
			/> */}
		</div>
	);
}

export default Stats