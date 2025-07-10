export class ConverterConst {
	static STR_RE_DAMAGE_TYPE = `(${Parser.DMG_TYPES.map(it => it.toTitleCase()).join("|")})`;
	static RE_DAMAGE_TYPE = new RegExp(`\\b${ConverterConst.STR_RE_DAMAGE_TYPE}\\b`, "gi");
	static STR_RE_CLASS = `(?<name>artificer|bárbaro|bard|cleric|Druida|fighter|monk|paladin|explorador|Pícaro|hechicero|warlock|wizard)`;
}
