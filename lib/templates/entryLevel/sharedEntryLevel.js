"use strict";

var _ = require('lodash');

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');

var h = require('../templateHelper');

exports.indication = {
    content: {
        name: 'observation',
        attr: {
            constant: {
                classCode: 'OBS',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId("2.16.840.1.113883.10.20.22.4.19"), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'category.coding[0]'
                },
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'effectiveTime',
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'low',
                                    'attr.value': leafLevel.date
                                }
                            }]
                        }
                    },
                    dataKey: 'onsetPeriod.start'
                }, {
                    content: {
                        name: 'value',
                        attr: {
                            assign: [{
                                constant: {
                                    'xsi:type': 'CD'
                                }
                            }, leafLevel.code]
                        }
                    },
                    dataKey: 'code.coding[0]'
                }
            ]
        }
    }
};

exports.preconditionForSubstanceAdministration = {
    content: {
        name: 'criterion',
        children: {
            arrayContent: [{
                name: 'code',
                attr: {
                    content: {
                        code: _.identity,
                        codeSystem: '2.16.840.1.113883.5.4'
                    },
                    dataKey: 'code'
                }
            }, {
                content: {
                    name: 'value',
                    attr: leafLevel.code
                },
                dataKey: 'value'
            }]
        }
    }
};

exports.drugVehicle = {
    content: {
        name: 'participantRole',
        attr: {
            constant: {
                classCode: 'MANU'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.20'),
                h.constAttrChild('code', {
                    code: '412307009',
                    displayName: 'drug vehicle',
                    codeSystem: '2.16.840.1.113883.6.96',
                    codeSystemName: 'SNOMED CT'
                }), {
                    content: {
                        name: 'playingEntity',
                        attr: {
                            constant: {
                                classCode: 'MMAT'
                            }
                        },
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'code',
                                    attr: leafLevel.code
                                }
                            }, {
                                content: {
                                    name: 'name',
                                    text: {
                                        dataKey: 'name'
                                    }
                                }
                            }]
                        }
                    }
                }
            ]
        }
    }
};

exports.instructions = {
    content: {
        name: 'act',
        attr: {
            constant: {
                classCode: 'ACT',
                moodCode: 'INT'
            }
        },
        children: [
            fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.20'), {
                content: {
                    name: 'code',
                    attr: leafLevel.code
                },
                dataKey: 'TBD'
            },
            h.constAttrChild('statusCode', {
                code: 'completed'
            })
        ]
    }
};

exports.serviceDeliveryLocation = {
    content: {
        name: 'participantRole',
        attr: {
            constant: {
                classCode: 'SDLOC'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.32'), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'type.coding[0]'
                }, {
                    value: fieldLevel.usRealmAddress,
                    dataKey: 'address'
                },
                fieldLevel.telecom, {
                    content: {
                        name: 'playingEntity',
                        attr: {
                            constant: {
                                classCode: 'PLC'
                            }
                        },
                        children: {
                            content: {
                                name: 'name',
                                text: _.identity
                            },
                            multiple: true
                        }
                    },
                    dataKey: 'name'
                }
            ]
        }
    }
};

exports.productInstance = {
    content: {
        name: 'participantRole',
        attr: {
            constant: {
                classCode: 'MANU'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.37'),
                fieldLevel.id2, {
                    content: {
                        name: 'playingDevice',
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'code',
                                    attr: leafLevel.code
                                }
                            }]
                        }
                    },
                    dataKey: 'type.coding[0]'
                }
            ]
        }
    }
};

exports.ageObservation = {
    content: {
        name: 'observation',
        attr: {
            constant: {
                classCode: 'OBS',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.31'),
                h.constAttrChild('code', {
                    code: '445518008',
                    displayName: 'Age At Onset',
                    codeSystem: '2.16.840.1.113883.6.96',
                    codeSystemName: 'SNOMED CT'
                }),
                fieldLevel.statusCodeCompleted, {
                    content: {
                        name: 'value',
                        attr: {
                            content: {
                                'xsi:type': 'PQ',
                                value: {
                                    value: String,
                                    dataKey: 'value'
                                },
                                unit: {
                                    dataKey: 'unit'
                                }
                            }
                        }
                    }
                }
            ]
        }
    }
};

exports.commentActivity = {
    content: {
        name: 'act',
        attr: {
            constant: {
                classCode: 'ACT',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.64'), {
                    content: {
                        name: 'code',
                        attr: {
                            constant: {
                                code: '48767-8',
                                displayName: 'Annotation Comment',
                                codeSystem: '2.16.840.1.113883.6.1',
                                codeSystemName: 'LOINC'
                            }
                        }
                    }
                }, {
                    content: {
                        name: 'text',
                        text: _.identity
                    }
                }
            ]
        }
    }
};
