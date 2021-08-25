import Popup from "../elements/modal"
import Button from "../elements/button"

interface typesModalContent {
    data: {
        title: string;
        description: string;
        buttonOpen: string;
        buttonClose: string;
    }
}

const ModalContent: React.FC<typesModalContent> = ({data}) => {
    console.log(data, 'ini datanya modal')

    return (
        <Popup title={data.title} description={data.description} buttonOpen={data.buttonOpen} buttonClose={data.buttonClose} />
    );
};

export default ModalContent;
