export default function () {
	const loginInfo = useState("loginInfo", () => ({
		name: "jingyuan",
		age: 20,
		token: "aabbccc",
	}));

    const changeAge = (num)=>{
        loginInfo.value.age = loginInfo.value.age+num;
    }
    return {
        loginInfo,
        changeAge
    }
}
