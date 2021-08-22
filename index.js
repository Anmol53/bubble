/* =============== Add Random Background color to Body =============== */

window.addEventListener("DOMContentLoaded", (event) => {
	const body = document.querySelector("body");
	const { backgroundColor, backgroundImage } = randomGradientGenerator();
	body.style.backgroundColor = backgroundColor;
	body.style.backgroundImage = backgroundImage;
});

/* ================ Recalculate Dimensions on Resize ================ */

let resizeTimeout;
window.addEventListener("resize", (event) => {
	clearTimeout(resizeTimeout);
	resizeTimeout = setTimeout(() => {
		const input = document.querySelector("#input_form");
		generateBubbles({
			id: "bubble_container",
			n: input.numberOfBubbles.value,
			color: input.color.value,
			speed: input.speed.value,
			size: input.size.value,
		});
	}, 100);
});

/* ================ Display Range Input updated Value ================ */

const updateValues = (ele) => {
	const display = document.querySelector(`#${ele.name}_display`);
	display.innerText = `${ele.value} ${ele.getAttribute("data-unit")}`;
};

/* ======== Button handler for generating Customized bubbles ========= */

const customizeBubbles = (input) => {
	generateBubbles({
		id: "bubble_container",
		n: input.numberOfBubbles.value,
		color: input.color.value,
		speed: input.speed.value,
		size: input.size.value,
	});
};

/* ================== Generate Customized bubbles ================== */

async function generateBubbles({ id, n, color, speed, size = 100 } = {}) {
	const container = document.getElementById(id);
	const toDel = [];
	const children = container.children;
	for (let i = 0; i < children.length; i++) {
		if (children[i].id.startsWith(`${id}_bubble_`)) {
			toDel.push(children[i]);
		}
	}
	toDel.forEach((item) => item.remove());
	for (let i = 1; i <= n; i++) {
		let bubble = document.createElement("div");
		bubble.id = `${id}_bubble_"${i}`;
		bubble.classList.add("bubble");
		bubble.innerHTML =
			'<img src="http://anmolagrawal.tech/images/bubble2.png">';
		let backgroundColor = color;
		let backgroundImage = color;
		if (!color) {
			backgroundColor = randomColorGenerator();
		}
		bubble.style.backgroundColor = backgroundColor;
		bubble.style.backgroundImage = backgroundImage;
		bubble.style.height = `${size}px`;
		bubble.style.width = `${size}px`;
		await sleep(150);
		container.appendChild(bubble);
		bubbleMotion(id, bubble.id, speed, size);
	}
}

/* ============= Hold the code for given milliseconds ============= */

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ==================== Generate Random Colour ==================== */

function randomColorGenerator() {
	let x = Math.random();
	let randomColor = Math.floor(x * 16777215).toString(16);
	return `#${randomColor}`;
}

/* ==================== Generate Random Gradient ==================== */

function randomGradientGenerator() {
	let x = Math.random();
	let randomColor1 = Math.floor(x * 16777215).toString(16);
	let randomColor2 = Math.floor(x * 16700000).toString(16);
	return {
		backgroundColor: `#${randomColor1}`,
		backgroundImage: `linear-gradient(90deg, #${randomColor1} 0%, #${randomColor2} 100%)`,
	};
}

/* ================= Add motions in bubble ================= */

function bubbleMotion(parentId, id, speed = 8, size) {
	let parent = document.getElementById(parentId);
	let elem = document.getElementById(id);
	let xD = Math.random() * speed;
	let yD = Math.random() * speed;
	let dim = parent.getBoundingClientRect();
	let top = 0;
	let bottom = dim.height - size;
	let left = 0;
	let right = dim.width - size;
	let posX = left + 10;
	let posY = top + 10;
	setInterval(move, 25);
	function move() {
		posX += xD;
		posY += yD;
		if (posX <= left || posX >= right) {
			xD *= -1;
			posX += xD;
		}
		if (posY <= top || posY >= bottom) {
			yD *= -1;
			posY += yD;
		}
		elem.style.left = posX + "px";
		elem.style.top = posY + "px";
	}
}
