export default function SelectionCard() {
  return (
    <div className="cardwrap">
      <div className="tsheet">
        <div className="ts-head">
          <div className="ts-title">WHATBYTES</div>
          <div className="ts-sub">Venture Studio · 6-Month Incubation</div>
          <div className="ts-info"><span>REF #WB-VS</span><span>BY APPLICATION</span></div>
        </div>

        <div className="seats">
          <div className="seats-l">
            <div className="seats-num">05</div>
            <div className="seats-lab">seats<br />this quarter</div>
          </div>
          <div>
            <div className="dots">
              <i className="on" /><i className="on" /><i /><i /><i />
            </div>
            <div className="status">Selection in progress</div>
          </div>
        </div>

        <div className="sel-rule"><span>What the five get</span></div>

        <div className="phase">
          <div className="pl">
            <span className="pname"><span className="pn">01</span>We build your MVP</span>
            <span className="pamt">30 days · free</span>
          </div>
        </div>
        <div className="phase">
          <div className="pl">
            <span className="pname"><span className="pn">02</span>We keep building</span>
            <span className="pamt">super-subsidized</span>
          </div>
        </div>
        <div className="phase last">
          <div className="pl">
            <span className="pname"><span className="pn">03</span>We grow with you</span>
            <span className="pamt">partners</span>
          </div>
        </div>
      </div>

      <div className="ts-stamp">
        <span className="big">5 ONLY</span>
        <span className="sm">By selection</span>
      </div>
    </div>
  );
}
