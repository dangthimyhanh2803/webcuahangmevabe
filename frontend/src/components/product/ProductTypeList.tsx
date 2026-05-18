import types from "../../data/tyles"

//const types = ['T-shirt', 'Polo', 'Shirt', 'Jacket', 'Pants', 'Short Pants'];
interface Props {
    selectedType: string | null;
    onSelect: (type: string | null) => void;
}

const ProductTypeList = ({selectedType, onSelect}: Props) => {
    return (
        <div className="type-list">
            {types.map(type => {
                const isActive = selectedType === type.name;
                return (
                    <div key={type.id}
                         className={`type-item ${isActive ? "active" : ""}`}
                         onClick={() =>
                             onSelect(isActive ? null : type.name)
                         }
                    >
                        <div className="type-icon">
                            <img src={type.image} alt={type.name}/>
                        </div>
                        <span>{type.name}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductTypeList;
