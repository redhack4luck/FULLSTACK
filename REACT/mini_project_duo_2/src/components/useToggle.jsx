import { useState } from 'react';

function useToggle() {
    const [isToggled, setIsToggled] = useState(false)
    const toggle = () => setIsToggled(!isToggled)
    return [isToggled, toggle]
}

export default useToggle