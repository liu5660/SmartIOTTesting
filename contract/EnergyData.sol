pragma solidity ^0.8.0;

contract EnergyData {

struct Record {
string deviceId;
string humidity;
string weight; 
string gas;
string dataHash;
uint256 receivedAt;
}

Record[] public records;

event DataStored(
string deviceId,
string humidity,
string weight,
string gas,
string dataHash,
uint256 receivedAt
);

function storeData(
string memory _deviceId,
string memory _humidity,
string memory _weight,
string memory _gas,
string memory _dataHash
) public {

Record memory newRecord = Record({
deviceId: _deviceId,
humidity: _humidity,
weight: _weight,
gas: _gas,
dataHash: _dataHash,
receivedAt: block.timestamp
});

records.push(newRecord);

emit DataStored(_deviceId, _humidity, _weight, _gas, _dataHash, block.timestamp);
}

function getRecord(uint256 index)
public
view
returns (string memory, string memory, string memory, string memory, string memory, uint256)
{
Record memory r = records[index];
return (r.deviceId, r.humidity, r.weight, r.gas, r.dataHash, r.receivedAt);
}

function getCount() public view returns (uint256) {
return records.length;
}
}