import {ManageExternalUtils} from "./manageexternal/manageexternal-utils.js";

class IndexPage {
	static async _pOnLoad_pInitGeneric () {
		await Promise.all([
			PrereleaseUtil.pInit(),
			BrewUtil2.pInit(),
		]);
		ExcludeUtil.pInitialise().then(null);
	}

	static _pOnLoad_initElements () {
		es(`#current_year`).txt((new Date()).getFullYear());

		es(`#version_number`).txt(VERSION_NUMBER).attr("href", `https://github.com/5etools-mirror-3/5etools-src/releases/latest`);

		em(`[data-link-type="better20"]`)
			.forEach(lnk => lnk.attr("href", `${lnk.attr("href")}?v=${VERSION_NUMBER}_${Date.now()}`));

		window.__cmp2 = () => {
			alert("This only works on a live version of the site!");
		};
	}

	static async _pOnLoad_pAddHashChangeListener () {
		window.addEventListener("hashchange", () => this._pOnHashChange());
		await this._pOnHashChange();
	}

	static async pOnLoad () {
		await this._pOnLoad_pInitGeneric();
		this._pOnLoad_initElements();
		await this._pOnLoad_pAddHashChangeListener();

		window.dispatchEvent(new Event("toolsLoaded"));
	}

	/* -------------------------------------------- */

	static _HASHCHANGE_LOCK = null;

	static async _pOnHashChange () {
		this._HASHCHANGE_LOCK ||= new VeLock();
		try {
			await this._HASHCHANGE_LOCK.pLock();
			await this._pOnHashChange_();
		} finally {
			this._HASHCHANGE_LOCK.unlock();
		}
	}

	static async _pOnHashChange_ () {
		await ManageExternalUtils.pAddSourcesFromHash();
	}
}

window.addEventListener("load", () => IndexPage.pOnLoad());
