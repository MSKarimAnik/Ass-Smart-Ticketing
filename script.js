
// 1st requirment : we click button on bannar section it's shows our bus layout section
// process : * bannar section is firstPage and id-firstPage,  best offer sectio is secondPage id -secondPage, Bus layout section is thirdPage id-thirdPage.

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Get reference to the button to go to the third page
    const goToThirdPageButton = document.getElementById('goToThirdPageButton');

    // Add event listener to the button to navigate to the third page
    goToThirdPageButton.addEventListener('click', function () {
        // Hide the first and second page
        document.getElementById('firstPage').style.display = 'none';
        document.getElementById('secondPage').style.display = 'none';
        // Show the third page
        document.getElementById('thirdPage').style.display = 'block';
    });
});


let selectedSeats = 0;
let remainingSeats = 8;
let totalFare = 0;
let couponApplied = false;

const seatElements = document.querySelectorAll('.seat');
const selectedSeatsDisplay = document.getElementById('selectedSeats');
const remainingSeatsDisplay = document.getElementById('remainingSeats');
const totalFareDisplay = document.getElementById('totalFare');
const nextBtn = document.getElementById('nextBtn');
const phoneNumberInput = document.getElementById('phoneNumber');
const couponCodeInput = document.getElementById('couponCode');
const applyBtn = document.getElementById('applyBtn');

seatElements.forEach(seat => {
    seat.addEventListener('click', () => {
        if (selectedSeats < 4) {
            if (!seat.classList.contains('bg-green-500')) {
                seat.classList.add('bg-green-500');
                selectedSeats++;
                remainingSeats--;
                updateSeatsInfo();
                checkNextButton();
            }
        } else {
            alert('Please select only 4 seats');
        }
    });
});

phoneNumberInput.addEventListener('input', () => {
    checkNextButton();
});

function checkNextButton() {
    if (selectedSeats > 0 && phoneNumberInput.value.trim() !== '') {
        nextBtn.disabled = false;
        nextBtn.classList.remove('bg-gray-500', 'disabled:opacity-50', 'disabled:cursor-not-allowed');
        nextBtn.classList.add('bg-green-500');
    } else {
        nextBtn.disabled = true;
        nextBtn.classList.remove('bg-green-500');
        nextBtn.classList.add('bg-gray-500', 'disabled:opacity-50', 'disabled:cursor-not-allowed');
    }
}

nextBtn.addEventListener('click', () => {
    const phoneNumber = phoneNumberInput.value;
    if (selectedSeats > 0 && phoneNumber.trim() !== '') {
        alert('images/Success Modal.png');
        nextBtn.disabled = true;
        nextBtn.classList.add('bg-green-500', 'cursor-default');
        couponCodeInput.disabled = false;
        applyBtn.disabled = false;
    } else {
        alert('Please select seats and enter your phone number.');
    }
});

couponCodeInput.addEventListener('input', () => {
    applyBtn.disabled = couponCodeInput.value.trim() === '';
});

applyBtn.addEventListener('click', () => {
    const couponCode = couponCodeInput.value.trim();
    if (couponCode === 'NEW15' && !couponApplied) {
        totalFare = totalFare * 0.85;
        couponApplied = true;
        updateTotalFare();
    } else if (couponCode === 'Couple20' && !couponApplied) {
        totalFare = totalFare * 0.80;
        couponApplied = true;
        updateTotalFare();
    } else {
        alert('Invalid or already applied coupon code.');
    }
});

function updateSeatsInfo() {
    selectedSeatsDisplay.textContent = selectedSeats;
    remainingSeatsDisplay.textContent = remainingSeats;
    totalFare = selectedSeats * 550;
    updateTotalFare();
}

function updateTotalFare() {
    totalFareDisplay.textContent = `BDT${totalFare}`;
}