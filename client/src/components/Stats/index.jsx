import { Link } from "react-router-dom";
import { useShop } from '../../contexts/ShopContext'
import { AvatarModal } from '..';
import avatarImage from '../../assets/images/testavatars/avi.png'

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Stats = () => {
	
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

	return (
		<div className="flex-container">
			<div className="container2">
				<div className="rectangle-1">
					<div className="text-wrapper-6">My coins</div>
					<div className="rectangle-2">
						<img
						className="img"
						alt="Image"
						src="/src/assets/images/testitem/coin.png"
						/>
						<div className="text-wrapper-7">950</div>
					</div>
				</div>
			</div>
			<div className="container3">
				<div className="rectangle-3">
					<div className="text-wrapper-9"> My Inventory</div>
					<div className="rectangle-4">
						<button className="shop-button" onClick={showModal}>Open</button>
					</div>
				</div>
			</div>
			<div className="container4">
				<div className="rectangle-3">
					<div className="text-wrapper-9">Shop</div>
					<div className="rectangle-4">
						<Link to="/shop">
							<button className="shop-button">Enter here</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="container5">
					<div className="rectangle-5">
						<div className="text-wrapper-11">Login streak</div>
						<div className="rectangle-6">
							<div className="text-wrapper-12">5 days</div>
						</div>
				</div>
			</div>
			<img
					className="bg-image"
					alt="Rectangle"
					src="/src/assets/images/testbg/rainbow.jpg"
			/>
		</div>
	);
}

export default Stats