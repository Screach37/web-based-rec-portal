import React from "react";

const LeftPage = () => {
	return (
		<>
			<div>
				<CheckCircleIcon style={{ color: "green" }} />
				<span>Applied</span>
			</div>
			<div>
				<BookmarkIcon style={{ color: "#537fe7" }} />
				<span>BookMarks</span>
			</div>
			<div>
				<WorkIcon />
				<span>Internships</span>
			</div>
			<div>
				<WorkHistoryIcon style={{ color: "#89375F" }} />
				<span>FullTime Job</span>
			</div>
		</>
	);
};

export default LeftPage;
