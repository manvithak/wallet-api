function getAge(dob) {
	var today = new Date();
	var birthyear = dob.substr(0,4);
	var age = today.getFullYear() - birthyear;

	return age;
}
module.exports = getAge;