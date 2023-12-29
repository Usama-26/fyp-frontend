// SPDX-License-Identifier: MIT
pragma solidity 0.8.22;

contract Escrow {
    address public owner;

    uint256 private feeEarnings;

    struct Project {
        string projectId;
        address freelancerAddress;
        uint256 awardDate;
        uint256 ethereumPrice;
        bool released;
    }

    mapping(address => mapping(string => Project)) private projects;

    event ProjectAwarded(address indexed client, string projectId, address freelancer, uint256 ethereumPrice);
    event PaymentReleased(address indexed client, string projectId, uint256 ethereumPrice);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    modifier ownerOnly {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function awardProject(string memory pId, address fAddress, uint256 price) public payable {
        require(msg.value >= price, "Insufficient ethereum sent for awarding a project");
        require(fAddress != address(0), "Freelancer address cannot be zero");
        require(bytes(projects[msg.sender][pId].projectId).length == 0, "Project with this ID already exists");

        Project memory newProject = Project(pId, fAddress, block.timestamp, price, false);
        projects[msg.sender][pId] = newProject;

        emit ProjectAwarded(msg.sender, pId, fAddress, price);
    }

    function releasePayment(string memory pId) public {
        Project storage project = projects[msg.sender][pId];
        require(bytes(project.projectId).length > 0, "Project with this ID does not exist");
        require(!project.released, "Funds already released for this project");

        payable(project.freelancerAddress).transfer(project.ethereumPrice);
        project.released = true;

        emit PaymentReleased(msg.sender, pId, project.ethereumPrice);
    }

    function withdrawFunds() public ownerOnly {
        uint256 amount = feeEarnings;
        feeEarnings = 0;

        payable(owner).transfer(amount);

        emit FundsWithdrawn(owner, amount);
    }

   
}
